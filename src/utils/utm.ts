export const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export const getUtmFromCookies = (): Record<string, string> => {
  if (typeof window === "undefined") return {};

  const utmData: Record<string, string> = {};

  UTM_PARAMS.forEach((param) => {
    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${param}=`))
      ?.split("=")[1];

    if (value) {
      utmData[param] = decodeURIComponent(value);
    }
  });

  return utmData;
};

export const getUtmFromUrl = (): Record<string, string> => {
  if (typeof window === "undefined") return {};

  const urlParams = new URLSearchParams(window.location.search);
  const utmData: Record<string, string> = {};

  UTM_PARAMS.forEach((param) => {
    const value = urlParams.get(param);
    if (value) {
      utmData[param] = value;
    }
  });

  return utmData;
};

export const utmToQueryString = (utmData: Record<string, string>): string => {
  const params = new URLSearchParams();

  Object.entries(utmData).forEach(([key, value]) => {
    if (value && UTM_PARAMS.includes(key as (typeof UTM_PARAMS)[number])) {
      params.append(key, value);
    }
  });

  return params.toString();
};

export const getAllUtmParams = (): Record<string, string> => {
  const urlUtms = getUtmFromUrl();
  const cookieUtms = getUtmFromCookies();

  return { ...cookieUtms, ...urlUtms };
};

export const addUtmsToUrl = (
  baseUrl: string,
  utmData?: Record<string, string>
): string => {
  const utms = utmData || getAllUtmParams();
  const queryString = utmToQueryString(utms);

  if (!queryString) return baseUrl;

  const separator = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${separator}${queryString}`;
};

export const useUtmParams = () => {
  if (typeof window === "undefined") {
    return {
      utmParams: {},
      utmQueryString: "",
      addUtmsToUrl: (url: string) => url,
    };
  }

  const utmParams = getAllUtmParams();
  const utmQueryString = utmToQueryString(utmParams);

  return {
    utmParams,
    utmQueryString,
    addUtmsToUrl: (url: string) => addUtmsToUrl(url, utmParams),
  };
};
