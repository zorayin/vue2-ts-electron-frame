import BasicApiService from "./BasicApiService";
import { ModuleTypes } from "@/types/moduleTypes";
import { commit } from "vuex-pathify";
import Store from "@/store";
import { Message } from "element-ui";
import Vue from "vue";
import viewApiService from "@/http/ViewApiClient";

const iMessage = Message;

const globalPath = (attr: string): string => `${ModuleTypes.GLOBAL_MODULE}/${attr}`;

class GlobalApiClient extends BasicApiService {
}

const apiService = new GlobalApiClient();
export default apiService;
