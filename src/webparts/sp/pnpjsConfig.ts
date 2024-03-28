import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import {SPFI, spfi, SPFx as spSPFx} from "@pnp/sp";

var _sp: SPFI = null;

export const getSP = (context?: WebPartContext): SPFI => {

  if (context != null) {
    _sp = spfi().using(spSPFx(context));
  }
  
  return _sp;
};