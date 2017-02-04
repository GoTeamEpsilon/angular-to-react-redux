import {
  SET_PATIENT_IN_CONTEXT,
  setPatientInContext,
  default as patientReducer
} from 'routes/Patient/modules/patient'

describe('Patient module', () => {
  it('Should export a constant SET_PATIENT_IN_CONTEXT', () => {
    expect(SET_PATIENT_IN_CONTEXT).to.equal('SET_PATIENT_IN_CONTEXT')
  })

  describe('Reducer', () => {
    describe('the initial state', () => {
      describe('the first call', () => {
        it('is empty', () => {
          expect(patientReducer(undefined, {})).to.eql({})
        })
      })

      describe('when action isn\'t matched', () => {
        it('is empty', () => {
          let state = patientReducer(undefined, {})
          state = patientReducer(state, { type: 'UNKNOWN' })
          expect(patientReducer(undefined, state)).to.eql({})
        })
      })

      // describe('when action is matched', () => {
      //   it('is empty', () => {
      //     let state = patientReducer(undefined, {})
      //     state = patientReducer(state, { type: SET_PATIENT_IN_CONTEXT, payload: 'test' })
      //     expect(patientReducer(undefined, state)).to.eql({})
      //   })
      // })
    })
  })

  describe('setPatientInContext', () => {
    let _globalState
    let _dispatchSpy
    let _getStateSpy

    beforeEach(() => {
      _globalState = {
        counter : patientReducer(undefined, {})
      }
      _dispatchSpy = sinon.spy((action) => {
        _globalState = {
          ..._globalState,
          counter : patientReducer(_globalState.counter, action)
        }
      })
      _getStateSpy = sinon.spy(() => {
        return _globalState
      })
    })

    it('Should be exported as a function.', () => {
      expect(setPatientInContext).to.be.a('function')
    })

    it('Should return a function (is a thunk).', () => {
      expect(setPatientInContext()).to.be.a('function')
    })

    it('Should return a promise from that thunk that gets fulfilled.', () => {
      return setPatientInContext(1337 )(_dispatchSpy, _getStateSpy).should.eventually.be.fulfilled
    })

    it('Should call dispatch and getState exactly once.', () => {
      return setPatientInContext()(_dispatchSpy, _getStateSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
          _getStateSpy.should.have.been.calledOnce
        })
    })

    it('Should produce a state that is double the previous state.', () => {
      _globalState = { counter: 2 }

      return setPatientInContext()(_dispatchSpy, _getStateSpy)
        .then(() => {
          _dispatchSpy.should.have.been.calledOnce
          _getStateSpy.should.have.been.calledOnce
          expect(_globalState.counter).to.equal(4)
          return setPatientInContext()(_dispatchSpy, _getStateSpy)
        })
        .then(() => {
          _dispatchSpy.should.have.been.calledTwice
          _getStateSpy.should.have.been.calledTwice
          expect(_globalState.counter).to.equal(8)
        })
    })
  })
})
