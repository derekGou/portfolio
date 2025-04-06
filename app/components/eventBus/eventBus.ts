import mitt from "mitt";

type Events = {
  myEvent: string | [string, string[]];
};

const eventBus = mitt<Events>();
export default eventBus;