import { type SubscriberConfig, type SubscriberArgs } from "@medusajs/medusa";
export default function handleOrderShipped({ data, container, }: SubscriberArgs<Record<string, any>>): Promise<void>;
export declare const config: SubscriberConfig;
