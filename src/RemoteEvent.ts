import { getRemoteFolder, RunService } from "./util";

export class RemoteEventDefinition<T extends Array<unknown>> {
	private instance: RemoteEvent;

	OnClientEvent: RBXScriptSignal<(...args: T) => unknown>;
	OnServerEvent: RBXScriptSignal<(plr: Player, ...args: T) => unknown>;

	constructor(name: string) {
		if (RunService.IsServer() || !RunService.IsRunning()) {
			this.instance = new Instance("RemoteEvent");
			this.instance.Name = name + "_RemoteEvent";
			this.instance.Parent = getRemoteFolder();
		} else {
			this.instance = getRemoteFolder().WaitForChild(name + "_RemoteEvent") as RemoteEvent;
		}

		this.OnClientEvent = this.instance.OnClientEvent;
		this.OnServerEvent = this.instance.OnServerEvent;
	}

	FireClient(plr: Player, ...args: T) {
		this.instance.FireClient(plr, ...args);
	}

	FireAllClients(...args: T) {
		this.instance.FireAllClients(...args);
	}

	FireServer(...args: T) {
		this.instance.FireServer(...args);
	}
}
