import { sbid } from "."

export const scene1Context = () => sbid("SCENE_1")
export const tehRaptorTextGroup = () => sbid("raptor-text")
export const tehRaptorText = () => scene1Context().querySelector("text")
export const raptor = () => scene1Context().querySelector("#RAPTOR")
