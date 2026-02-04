import api from "@/api/axiosInstance";


export const login = (payload) => {
  return api.post("auth/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const country = () => {
  return api.get("countries");
};

export const getStatesByCountry = (countryId) => {
  return api.get(`states/${countryId}`);
};

export const getCityByState = (stateId) => {
  return api.get(`cities/${stateId}`);
};

export const currency = () => {
  return api.get("country-currency");
};


export const language = () => {
  return api.get("languages");
};


export const StepOneRegister = (payload) => {
  return api.post("guide/register", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const StepTwoRegister = (payload) => {
  return api.post("guide/upload-identity-documents", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const StepThreeRegister = (payload) => {
  return api.post("guide/upload-licence-documents", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const StepFourRegister = (payload) => {
  return api.post("guide/upload-insurance-info", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const StepFiveRegister = (payload) => {
  return api.post("guide/languages-skills", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const StepSixRegister = (payload) => {
  return api.post("guide/payout-info", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const StepSevenRegister = (payload) => {
  return api.post("guide/public-info", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

