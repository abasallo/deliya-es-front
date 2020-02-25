import eventStates from './data/eventStates'

import { pushObjectIntoArrayWithReturn } from './modules/utils'

export default {
  Query: {
    eventStates: () => eventStates,
    eventState: (parent, args) => eventStates.find(_ => _.id === args.id)
  },

  Mutation: {
    addBenchmarking: (parent, args) =>
      pushObjectIntoArrayWithReturn(
        {
          id: Date.now().toString(),
          picture: args.eventState.picture,
          name: args.eventState.name,
          description: args.eventState.description,
          mapId: args.eventState.mapId,
          todoList: args.eventState.todoList,
          productList: args.eventState.productList
        },
        eventStates
      )
  }
}
