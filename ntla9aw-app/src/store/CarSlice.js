import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cars: JSON.parse(localStorage.getItem('cars')) ?? [],
};

console.log("Initial Cars:", initialState.cars);

const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    addCarBook: (state, action) => {
      console.log("Adding Car:", action.payload);
      const updatedCars = [...state.cars, action.payload];
      localStorage.setItem('cars', JSON.stringify(updatedCars));
      return { ...state, cars: updatedCars };
    },
    deleteCar: (state, action) => {
      console.log("Deleted Car:", action.payload);
      const updatedCars = state.cars.filter((_, i) => i !== action.payload);
      localStorage.setItem('cars', JSON.stringify(updatedCars));
      return { ...state, cars: updatedCars };
    },
    updateCar: (state, action) =>{
      console.log("Updating car: " + action.payload.id);
      const updatedTasks = state.cars.map((item, index) => index === action.payload.id ? action.payload.newCar : item);
      localStorage.setItem('cars', JSON.stringify(updatedTasks));
      return {...state, cars: updatedTasks}
    },
    reserveCar: (state, action) => {
      console.log("Reserving Car:", action.payload);
      const updatedCars = state.cars.map(car =>
        car.id === action.payload ? { ...car, isReserved: true } : car
      );
      localStorage.setItem('cars', JSON.stringify(updatedCars));
      return { ...state, cars: updatedCars };
    },
  },
});

export const { addCarBook, deleteCar, updateCar } = carSlice.actions;
export default carSlice.reducer;
