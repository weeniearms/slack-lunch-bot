const stores = {};

function getStore(teamId) {
  stores[teamId] = stores[teamId] || [];
  return stores[teamId];
}

const store = (teamId) => {
  return {
    add: (meal) => {
      getStore(teamId).push(meal.toLowerCase());
      return meal + ' added.';
    },
    remove: (meal) => {
      let index = getStore(teamId).lastIndexOf(meal.toLowerCase());
      if (index >= 0) {
        getStore(teamId).splice(index, 1);
      }
      return meal + ' removed.';
    },
    list: () => {
      // TODO: group by meal
      let order = {};
      for (let meal of getStore(teamId)) {
        order[meal] = (order[meal] || 0) + 1;
      }

      let summary = 'Today\'s order:';
      for (let meal in order) {
        summary = summary + `\n${order[meal]}\t${meal}`;
      }
      return summary;
    },
    clear: () => {
      stores[teamId] = [];
      return 'Order cleared.';
    }
  };
};

export default store;
