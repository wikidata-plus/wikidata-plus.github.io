import { create, windowedFiniteBatchScheduler } from "@yornaath/batshit";
import { getFeatures as getFeaturesRaw } from "osm-api";
import type { OsmFeatureType, UtilFeatureForType } from "osm-api/dist/types";

function getFeatureBatchManager<T extends OsmFeatureType>(type: T) {
  return create({
    async fetcher(ids: (number | string)[]) : Promise<UtilFeatureForType<T>[]> {
      const items: UtilFeatureForType<T>[]  = await getFeaturesRaw(type, ids);
      return items;
    },
    resolver: (items, id) => items.find(x => x.id == id),
    scheduler: windowedFiniteBatchScheduler({
      windowMs: 10,
      maxBatchSize: 700
    })
  });
}

const batchManager = {
  node: getFeatureBatchManager("node"),
  way: getFeatureBatchManager("way"),
  relation: getFeatureBatchManager("relation")
};


export async function getFeature<T extends OsmFeatureType>(type: T, id: number | string) : Promise<UtilFeatureForType<T>> {
  const item = await batchManager[type].fetch(id);
  if (item === undefined) {
    throw new Error(`Item not found: ${type} ${id}`);
  }

  return item as UtilFeatureForType<T>;
}

export async function getFeatures<T extends OsmFeatureType>(type: T, ids: (number | string)[]): Promise<UtilFeatureForType<T>[]> {
  return (await Promise.all(ids.map(id => batchManager[type].fetch(id)))).filter(Boolean) as UtilFeatureForType<T>[];
}


