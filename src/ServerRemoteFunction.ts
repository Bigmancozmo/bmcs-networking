import { AddPlayer, getRemoteFolder, RunService } from "./util";

export class ServerRemoteFunction<T extends (...args: never[]) => NonNullable<unknown>> {
	private instance: RemoteFunction;

	constructor(name: string) {
		if (RunService.IsServer()) {
			this.instance = new Instance("RemoteFunction");
			this.instance.Name = name + "_ServerRemoteFunction";
			this.instance.Parent = getRemoteFolder();
		} else {
			this.instance = getRemoteFolder().WaitForChild(name + "_ServerRemoteFunction") as RemoteFunction;
		}
	}

	SetCallback(callback: AddPlayer<T>) {
		this.instance.OnServerInvoke = callback as unknown as
			| ((player: Player, ...args: unknown[]) => void)
			| undefined;
	}

	InvokeServer(...args: Parameters<T>) {
		return new Promise<ReturnType<T>>((resolve, reject) => {
			try {
				const result = this.instance.InvokeServer(...args);
				resolve(result);
			} catch (err) {
				reject(err);
			}
		}).timeout(60, "Timed out");
	}
}
