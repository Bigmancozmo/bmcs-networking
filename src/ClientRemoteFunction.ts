import { getRemoteFolder, RunService } from "./util";

export class ClientRemoteFunction<T extends (...args: never[]) => NonNullable<unknown>> {
	private instance: RemoteFunction;

	constructor(name: string) {
		if (RunService.IsServer()) {
			this.instance = new Instance("RemoteFunction");
			this.instance.Name = name + "_ClientRemoteFunction";
			this.instance.Parent = getRemoteFolder();
		} else {
			this.instance = getRemoteFolder().WaitForChild(name + "_ClientRemoteFunction") as RemoteFunction;
		}
	}

	SetCallback(callback: T) {
		this.instance.OnClientInvoke = callback;
	}

	InvokeClient(plr: Player, ...args: Parameters<T>) {
		return new Promise<ReturnType<T>>((resolve, reject) => {
			try {
				const result = this.instance.InvokeClient(plr, ...args) as ReturnType<T>;
				if (result === undefined) reject("Client didn't send a value back");
				resolve(result);
			} catch (err) {
				reject(err);
			}
		}).timeout(120, "Timed out");
	}
}
