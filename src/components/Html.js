import React, { PropTypes } from 'react'
import { renderToString } from 'react-dom/server'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'

const Html = ({ assets, component, store }) => {
    const content = component ? renderToString(component) : ''
    const head = Helmet.rewind()
    return (
        <html lang="en-us">
            <head>
                {head.base.toComponent()}
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
                {head.script.toComponent()}
            </head>
            <body>
                <div
                    dangerouslySetInnerHTML={{ __html: content }}
                    id="content"
                />
                <script
                    charSet="UTF-8"
                    dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())}` }} // eslint-disable-line max-len
                />
                <script
                    charSet="UTF-8"
                    src={assets.main}
                />
            </body>
        </html>
    )
}

Html.propTypes = {
    assets: PropTypes.object.isRequired,
    component: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired
}

export default Html
