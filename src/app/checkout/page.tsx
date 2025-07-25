"use client";

import { useState, useCallback, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { CreditCard, Lock, AlertCircle, CheckCircle } from "lucide-react";
import Button from "@/components/button";
import { Product } from "@/types/product";
import { addUtmsToUrl } from "@/utils/utm";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get("id");
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [productError, setProductError] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
  });
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [cepError, setCepError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    installments: "1",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchProduct = useCallback(async (id: string) => {
    setIsLoadingProduct(true);
    setProductError("");
    try {
      const response = await fetch(`/api/products?id=${id}`);
      const data = await response.json();

      if (response.ok) {
        setProduct(data.product);
      } else {
        setProductError(data.error || "Erro ao carregar produto");
        setProduct(null);
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      setProductError("Erro ao carregar produto. Verifique sua conexão.");
      setProduct(null);
    } finally {
      setIsLoadingProduct(false);
    }
  }, []);

  const fetchAddress = useCallback(async (cepValue: string) => {
    if (cepValue.length === 8) {
      setIsLoadingAddress(true);
      setCepError("");
      setErrors((prev) => ({ ...prev, cep: "" }));
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cepValue}/json/`
        );
        const data = await response.json();

        if (!data.erro) {
          setAddress({
            street: data.logradouro || "",
            city: data.localidade || "",
            state: data.uf || "",
          });
          setShowAddressFields(true);
        } else {
          setCepError("CEP não encontrado. Verifique e tente novamente.");
          setShowAddressFields(false);
        }
      } catch (error) {
        console.log(error);
        setCepError("Erro ao buscar CEP. Verifique sua conexão.");
        setShowAddressFields(false);
      } finally {
        setIsLoadingAddress(false);
      }
    } else {
      setShowAddressFields(false);
      setCepError("");
      setErrors((prev) => ({ ...prev, cep: "" }));
    }
  }, []);

  const handleCepChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "");
      setCep(value);
      fetchAddress(value);
    },
    [fetchAddress]
  );

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    }

    if (!formData.cardNumber.replace(/\s/g, "")) {
      newErrors.cardNumber = "Número do cartão é obrigatório";
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Número do cartão deve ter 16 dígitos";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Data de validade é obrigatória";
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV é obrigatório";
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = "CVV deve ter pelo menos 3 dígitos";
    }

    if (!cep) {
      newErrors.cep = "CEP é obrigatório";
    } else if (cep.length !== 8) {
      newErrors.cep = "CEP deve ter 8 dígitos";
    }

    if (showAddressFields) {
      if (!address.street.trim()) {
        newErrors.street = "Rua é obrigatória";
      }
      if (!address.city.trim()) {
        newErrors.city = "Cidade é obrigatória";
      }
      if (!address.state.trim()) {
        newErrors.state = "Estado é obrigatório";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, cep, address, showAddressFields]);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const productPrice = useMemo(() => product?.price || 0, [product]);
  const installmentOptions = useMemo(() => {
    const options = [];
    for (let i = 1; i <= 12; i++) {
      const installmentValue = (productPrice / i).toFixed(2);
      options.push({
        value: i.toString(),
        label: `${i}x de R$ ${installmentValue} sem juros`,
      });
    }
    return options;
  }, [productPrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && productId) {
      const obrigadoUrl = addUtmsToUrl(`/obrigado?id=${productId}`);
      router.push(obrigadoUrl);
    }
  };

  useEffect(() => {
    if (!productId) {
      router.push("/#products");
      return;
    }
    fetchProduct(productId);
  }, [productId, fetchProduct, router]);

  if (!productId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecionando...</p>
        </div>
      </div>
    );
  }

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (productError || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-elevita to-[#FF8495] py-8 px-4 flex items-center justify-center">
        <div className="relative max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-2xl relative">
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rotate-45"></div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Ops! Produto não encontrado
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {productError ||
                  "Parece que este produto não existe ou foi removido. Que tal dar uma olhada nos nossos outros produtos incríveis?"}
              </p>

              <Button
                className="w-full justify-center"
                onClick={() => router.push("/#products")}
              >
                Ver Produtos Disponíveis
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row items-center min-h-screen bg-[#FEF4F9] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Detalhes do Pagamento
              </h2>
              <p className="text-gray-600 mb-8">Complete sua compra.</p>

              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nome Completo*
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="João Silva"
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                    aria-invalid={!!errors.fullName}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-elevita focus:border-transparent transition-colors ${
                      errors.fullName
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.fullName && (
                    <p
                      id="fullName-error"
                      className="mt-1 text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="cardNumber"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Número do Cartão*
                    </label>
                    <input
                      id="cardNumber"
                      name="cardNumber"
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        handleInputChange("cardNumber", formatted);
                      }}
                      placeholder="9273 1234 1234 1234"
                      maxLength={19}
                      aria-describedby={
                        errors.cardNumber ? "cardNumber-error" : undefined
                      }
                      aria-invalid={!!errors.cardNumber}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-elevita focus:border-transparent transition-colors ${
                        errors.cardNumber
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                    />
                    {errors.cardNumber && (
                      <p
                        id="cardNumber-error"
                        className="mt-1 text-sm text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="expiryDate"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Data de Validade*
                      </label>
                      <input
                        id="expiryDate"
                        name="expiryDate"
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          handleInputChange("expiryDate", formatted);
                        }}
                        placeholder="MM/AA"
                        maxLength={5}
                        aria-describedby={
                          errors.expiryDate ? "expiryDate-error" : undefined
                        }
                        aria-invalid={!!errors.expiryDate}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-elevita focus:border-transparent transition-colors ${
                          errors.expiryDate
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.expiryDate && (
                        <p
                          id="expiryDate-error"
                          className="mt-1 text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.expiryDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        CVV*
                      </label>
                      <div className="relative">
                        <input
                          id="cvv"
                          name="cvv"
                          type="text"
                          value={formData.cvv}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 4);
                            handleInputChange("cvv", value);
                          }}
                          placeholder="•••"
                          maxLength={4}
                          aria-describedby={
                            errors.cvv ? "cvv-error" : "cvv-help"
                          }
                          aria-invalid={!!errors.cvv}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-elevita focus:border-transparent pr-10 transition-colors ${
                            errors.cvv
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                        />
                        <CreditCard
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <p id="cvv-help" className="mt-1 text-xs text-gray-500">
                        3 ou 4 dígitos no verso do cartão
                      </p>
                      {errors.cvv && (
                        <p
                          id="cvv-error"
                          className="mt-1 text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="installments"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Parcelas*
                  </label>
                  <select
                    id="installments"
                    name="installments"
                    value={formData.installments}
                    onChange={(e) =>
                      handleInputChange("installments", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-elevita focus:border-transparent"
                  >
                    {installmentOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="cep"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    CEP*
                  </label>
                  <div className="relative">
                    <input
                      id="cep"
                      name="cep"
                      type="text"
                      value={cep}
                      onChange={handleCepChange}
                      placeholder="00000000"
                      maxLength={8}
                      aria-describedby={
                        cepError || errors.cep ? "cep-error" : "cep-help"
                      }
                      aria-invalid={!!(cepError || errors.cep)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-elevita focus:border-transparent transition-colors ${
                        cepError || errors.cep
                          ? "border-red-300 bg-red-50"
                          : showAddressFields
                          ? "border-green-300 bg-green-50"
                          : "border-gray-300"
                      }`}
                    />
                    {isLoadingAddress && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div
                          className="animate-spin rounded-full h-5 w-5 border-b-2 border-elevita"
                          aria-hidden="true"
                        ></div>
                      </div>
                    )}
                    {showAddressFields && !isLoadingAddress && (
                      <CheckCircle
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <p id="cep-help" className="mt-1 text-xs text-gray-500">
                    Digite apenas números (8 dígitos)
                  </p>
                  {(cepError || errors.cep) && (
                    <p
                      id="cep-error"
                      className="mt-1 text-sm text-red-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {cepError || errors.cep}
                    </p>
                  )}
                </div>

                {showAddressFields && (
                  <>
                    <div>
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Rua*
                      </label>
                      <input
                        id="street"
                        name="street"
                        type="text"
                        value={address.street}
                        onChange={(e) =>
                          setAddress({ ...address, street: e.target.value })
                        }
                        aria-describedby={
                          errors.street ? "street-error" : undefined
                        }
                        aria-invalid={!!errors.street}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-elevita focus:border-transparent transition-colors ${
                          errors.street
                            ? "border-red-300 bg-red-50"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.street && (
                        <p
                          id="street-error"
                          className="mt-1 text-sm text-red-600 flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {errors.street}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Cidade*
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={address.city}
                          onChange={(e) =>
                            setAddress({ ...address, city: e.target.value })
                          }
                          aria-describedby={
                            errors.city ? "city-error" : undefined
                          }
                          aria-invalid={!!errors.city}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-elevita focus:border-transparent transition-colors ${
                            errors.city
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.city && (
                          <p
                            id="city-error"
                            className="mt-1 text-sm text-red-600 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Estado*
                        </label>
                        <input
                          id="state"
                          name="state"
                          type="text"
                          value={address.state}
                          onChange={(e) =>
                            setAddress({ ...address, state: e.target.value })
                          }
                          aria-describedby={
                            errors.state ? "state-error" : undefined
                          }
                          aria-invalid={!!errors.state}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-elevita focus:border-transparent transition-colors ${
                            errors.state
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.state && (
                          <p
                            id="state-error"
                            className="mt-1 text-sm text-red-600 flex items-center gap-1"
                          >
                            <AlertCircle className="w-4 h-4" />
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => router.push("/#products")}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  Voltar
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-6 lg:p-8 h-fit">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Resumo
              </h2>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="relative w-16 h-16 flex-shrink-0 mx-auto sm:mx-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="72px"
                      className="rounded-lg object-cover"
                      quality={100}
                      priority
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left w-full">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      <span className="text-sm text-gray-500">
                        Quantidade: 1
                      </span>
                      <div className="flex items-center gap-2">
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {product.originalPrice.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        )}
                        <span className="font-semibold text-gray-900">
                          {product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete</span>
                  <span className="font-semibold text-green-600">Grátis</span>
                </div>
                {product.originalPrice && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Desconto</span>
                    <span className="font-semibold text-green-600">
                      -
                      {(product.originalPrice - product.price).toLocaleString(
                        "pt-BR",
                        {
                          style: "currency",
                          currency: "BRL",
                        }
                      )}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full justify-center mb-4"
                onClick={() => {
                  if (validateForm()) {
                    console.log("Formulário válido, processando pagamento...");
                    const fakeEvent = {
                      preventDefault: () => {},
                    } as React.FormEvent;
                    handleSubmit(fakeEvent);
                  }
                }}
                aria-describedby="payment-security"
              >
                Realizar Pagamento
              </Button>

              <div
                id="payment-security"
                className="flex items-center justify-center text-xs sm:text-sm text-green-700 px-2"
              >
                <Lock
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-center">
                  Pagamentos são seguros e criptografados
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Checkout() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
