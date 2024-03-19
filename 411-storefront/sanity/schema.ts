import { type SchemaTypeDefinition } from "sanity"
import album from "./schemas/album"
import newsitem from "./schemas/newsitem"
import show from "./schemas/show"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [album, newsitem, show],
}
