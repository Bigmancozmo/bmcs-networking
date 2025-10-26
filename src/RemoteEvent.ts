import { getRemoteFolder, RunService } from "./util";

export class RemoteEventDefinition<T extends Array<unknown>> {
	private instance: RemoteEvent;

	OnClientEvent: RBXScriptSignal<(...args: T) => unknown>;
	OnServerEvent: RBXScriptSignal<(plr: Player, ...args: T) => unknown>;

	constructor(name: string) {
		const folder = getRemoteFolder();
		const targetName = name + "_RemoteEvent";

		if (RunService.IsServer() || !RunService.IsRunning()) {
			const existing = folder.FindFirstChild(targetName);
			if (existing && existing.IsA("RemoteEvent")) {
				this.instance = existing;
			} else {
				this.instance = new Instance("RemoteEvent");
				this.instance.Name = targetName;
				this.instance.Parent = folder;
			}
		} else {
			this.instance = folder.WaitForChild(targetName) as RemoteEvent;
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
