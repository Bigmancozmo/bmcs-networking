export function getRemoteFolder() {
	let folder = script.Parent?.FindFirstChild("RemoteFolder") as Folder | undefined;
	if (folder) return folder;
	folder = new Instance("Folder");
	folder.Name = "RemoteFolder";
	folder.Parent = script.Parent;
	return folder;
}

export const RunService = game.GetService("RunService");

export type AddPlayer<T extends (...args: never[]) => NonNullable<unknown>> = (
	plr: Player,
	...args: Parameters<T>
) => ReturnType<T>;
