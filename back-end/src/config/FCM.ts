import { FCM_SERVICE_ACCOUNT_PATH } from "./CheckableEnv";
import { ServiceAccount } from "firebase-admin";
import { readTextFile } from "../utils/File";

export const serviceAccount: ServiceAccount & any = JSON.parse(readTextFile(FCM_SERVICE_ACCOUNT_PATH));
