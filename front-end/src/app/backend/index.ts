import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import { ParseQuery } from "functions";
export const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3400";
import {
	auth,
	integration,
	client,
	admin,
	deliveryMan,
	desk,
	shipments,
	role,
	payment,
	product,
	tools,
	transactions,
	moneyCollection,
} from "./endpoints";
import { BuilderI } from "@/types/redux";

const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: apiUrl,
		credentials: "include",
		headers: {
			"user-kind": "Admin",
		},
	}),
	endpoints: (builder: BuilderI) => ({
		...auth(builder),
		...integration(builder),
		...client(builder),
		...admin(builder),
		...shipments(builder),
		...role(builder),
		...desk(builder),
		...product(builder),
		...payment(builder),
		...tools(builder),
		...moneyCollection(builder),
		...transactions(builder),
		//...user(builder),
		...deliveryMan(builder),
	}),
});

export default api;
