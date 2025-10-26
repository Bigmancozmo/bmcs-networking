import { getRemoteFolder, RunService } from "./util";

export class ClientRemoteFunction<T extends (...args: never[]) => NonNullable<unknown>> {
	private instance: RemoteFunction;

	constructor(name: string) {
		const folder = getRemoteFolder();
		const targetName = name + "_ClientRemoteFunction";

		if (RunService.IsServer() || !RunService.IsRunning()) {
			const existing = folder.FindFirstChild(targetName);
			if (existing && existing.IsA("RemoteFunction")) {
				this.instance = existing;
			} else {
				this.instance = new Instance("RemoteFunction");
				this.instance.Name = targetName;
				this.instance.Parent = folder;
			}
		} else {
			this.instance = folder.WaitForChild(targetName) as RemoteFunction;
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
