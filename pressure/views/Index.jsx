const React = require('react');
const AppLayout = require('./layout/AppLayout.jsx')

class Index extends React.Component {
    render() {
        return(
            <AppLayout title="This will be the index...">
                    <div>
                        <h3><a href="/tasks">See all tasks</a></h3>
                    </div>
            </AppLayout>
        );
    }
}

module.exports = Index;