const React = require('react');
const AppLayout = require('./layout/AppLayout.jsx')

class Index extends React.Component {
    render() {
        return(
            <AppLayout title="Due Today">
                    <div>
                        <h3><a href="/tasks">Show All</a></h3>
                    </div>
            </AppLayout>
        );
    }
}

module.exports = Index;