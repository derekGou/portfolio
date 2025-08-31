import mitt from "mitt";

type Events = {
  myEvent: string;
};

const eventBus = mitt<Events>();
export default eventBus;