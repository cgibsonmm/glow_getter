import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../shared/Layout'

function Welcome() {
    return (
        <Layout>
            <div className="Welcome">
                <h1>Welcome!</h1>
                <Link to="/login">
                    <button type="button">login></button>
                </Link>
            </div>
        </Layout>
    )
}

export default Welcome