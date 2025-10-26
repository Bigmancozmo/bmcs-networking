import { AddPlayer, getRemoteFolder, RunService } from "./util";

export class ServerRemoteFunction<T extends (...args: never[]) => NonNullable<unknown>> {
	private instance: RemoteFunction;

	constructor(name: string) {
		const folder = getRemoteFolder();
		const targetName = name + "_ServerRemoteFunction";

		if (RunService.IsServer() || !RunService.IsRunning()) {
			folder.FindFirstChild(targetName)?.Destroy();
			this.instance = new Instance("RemoteFunction");
			this.instance.Name = targetName;
			this.instance.Parent = folder;
		} else {
			this.instance = folder.WaitForChild(targetName) as RemoteFunction;
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
