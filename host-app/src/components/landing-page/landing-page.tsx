import { AppRootState, store } from '../../store/store'
import { Provider, useSelector } from 'react-redux'

import Widget from "microWidget/Widget"

const LandingPage = () => {

    const { isAuthorized } = useSelector((state: AppRootState) => state?.core?.auth);

    return (
        <section className='landing-page'>
            <Provider store={store}>

            </Provider>
            <Widget />

            {
                isAuthorized ? "Authorized" : "UnAuthorized"
            }

            <p>Above is microfrotnend</p>
            <p>Below is parent or host app</p>

            <p className="read-the-docs">
                This is host
            </p>
        </section>
    )
}

export default LandingPage
