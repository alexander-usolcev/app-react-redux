import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cn from 'classnames';

import { fetchUserDataIfNeeded } from '../../actions/index';
import Footer from '../../components/common/Footer';
import Lang from '../../lang';

class Index extends PureComponent {
    // noinspection JSCheckFunctionSignatures
    async componentDidMount() {
        const { dispatch } = this.props;

        const {TITLE} = Lang.get();
        document.title = TITLE;

        await dispatch(fetchUserDataIfNeeded());


        // do something after request.
        // console.log('[APP]: After request');
    }

    render() {
        const { isFetching, userData } = this.props;
        const { firstName, lastName, gitProfile } = userData;

        return (
            <div>
                <div className={cn({ "dn": isFetching })}>
                    <a href={gitProfile} target="_blank">{firstName} git page</a>
                </div>

                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        isFetching: state.userData.isFetching
    }
};

export default withRouter(connect(mapStateToProps)(Index));
