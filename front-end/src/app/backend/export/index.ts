import { useGetAdminsQuery } from "./admin";
import { useGetClientsQuery } from "./client";
export type useGetUserQueryI<T> = T extends ClientI
	? typeof useGetClientsQuery
	: T extends AdminI
	? typeof useGetAdminsQuery
	: T extends DeliveryManI
	? typeof useGetAdminsQuery // TODO: fix deliver
	: unknown;
