import api from "@/api/axiosInstance";
export const getProfile = () => {
  return api.get("guide/my-profile");
};

export const createTourStepOne = (payload) => {
  return api.post("guide/tours/create-tour-step-one", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createTourStepTwo = (payload) => {
  return api.post("guide/tours/create-tour-step-two", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createTourStepThree = (payload) => {
  return api.post("guide/tours/create-tour-step-three", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createTourStepFour = (payload) => {
  return api.post("guide/tours/create-tour-step-four", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createTourStepFive = (payload) => {
  return api.post("guide/tours/create-tour-step-five", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const createTourStepSix = (payload) => {
  return api.post("guide/tours/create-tour-step-six", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createTourStepSeven = (payload) => {
  return api.post("guide/tours/create-tour-step-seven", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createTourStepEight = (payload) => {
  return api.post("guide/tours/create-tour-step-eight", payload, {
    headers: {  
      "Content-Type": "application/json",
    },
  });
};

export const createTourStepNine = (payload) => {
  return api.post("guide/tours/create-tour-step-nine", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createTourStepTen = (payload) => {
  return api.post("guide/tours/create-tour-step-ten", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createTourStepEleven = (payload) => {
  return api.post("guide/tours/create-tour-step-eleven", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getTours = () => {
  return api.get("guide/tours/my-tours");
};

export const getToursDetails = (tourId) => {
 return api.get(`guide/tours/tour-details/${tourId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const ToursUpdate = (tourId) => {
  return api.get(`guide/tours/update-tour-status/${tourId}`);
};
