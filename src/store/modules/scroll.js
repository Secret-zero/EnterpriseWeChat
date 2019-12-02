const state = {
	indexScroll: ""
};

const getters = {
	getIndexScroll (state) {
		return state.indexScroll;
	}
};

const mutations = {
	setIndexScroll (state, scrollValue) {
		state.indexScroll = scrollValue;
	}
};

export default {
	state,
	getters,
	// actions,
	mutations
};
