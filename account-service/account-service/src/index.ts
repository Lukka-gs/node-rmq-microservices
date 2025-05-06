import "./providers/databases";
import { RabbitMQ } from "./providers/messager-broker-access/implementations/rabbit-mq/rabbit-mq.provider";
import { UserQueueRouter } from "./providers/messager-broker-access/router/user-queue.router";

const rabbit = new RabbitMQ();

new UserQueueRouter().handle(rabbit);

rabbit.connect().then(() => {
  console.log('Listen Messager broker is running...');
});
