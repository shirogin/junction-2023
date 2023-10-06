import { FCM_SERVICE_ACCOUNT_PATH } from "./CheckableEnv.js";
import { ServiceAccount } from "firebase-admin";
import { readTextFile } from "../utils/File.js";

export const serviceAccount: ServiceAccount & any = JSON.parse(readTextFile(FCM_SERVICE_ACCOUNT_PATH));
