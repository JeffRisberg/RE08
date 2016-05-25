import {REQUEST, SUCCESS, ERROR} from '../constants/StateTypes'

class BlockStateHelper {
    constructor(blockState) {
        this.blockState = blockState;

//        this.stateMatches = this.stateMatches.bind(this);
  //      this.isError = this.isError.bind(this);
    }
    
    isLoading() {
        return this.stateMatches(REQUEST);
    }

    stateMatches(state) {
        return this.blockState && this.blockState.state === state;
    }
    
    isError() {
        return this.stateMatches(ERROR);
    }

    hasErrorMessage() {
        return this.isError() && this.blockState.message !== null;
    }

    getErrorMessage() {
        return (this.isError()) ? this.blockState.message : null;
    }
    
    isSuccessful() {
        return this.stateMatches(SUCCESS);
    }

    getBlockState() {
        return this.blockState;
    }
}

export default BlockStateHelper;