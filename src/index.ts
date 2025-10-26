import { ServerRemoteFunction as _ServerRemoteFunction } from "./ServerRemoteFunction";
import { ClientRemoteFunction as _ClientRemoteFunction } from "./ClientRemoteFunction";
import { RemoteEventDefinition as _RemoteEventDefinition } from "./RemoteEvent";

script.FindFirstChild("RemoteFolder")?.Destroy()

export const ServerRemoteFunction = _ServerRemoteFunction;
export const ClientRemoteFunction = _ClientRemoteFunction;
export const RemoteEventDefinition = _RemoteEventDefinition;
