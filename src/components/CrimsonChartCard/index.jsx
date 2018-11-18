import React from 'react';
import { Card } from 'antd';
import classNames from 'classnames';
import './index.less';

export default class CrimsonChartCard extends React.PureComponent {
    renderConnet = () => {
        const { contentHeight, title, avatar, action, total, footer, children, loading } = this.props;
        if (loading) {
          return false;
        }
        return (
          <div className={classNames('chartCard')}>
            <div
              className={classNames('chartTop', {
                'chartTopMargin': !children && !footer,
              })}
            >
              <div className={classNames('avatar')}>{avatar}</div>
              <div className={classNames('metaWrap')}>
                <div className={classNames('meta')}>
                  <span className={classNames('title')}>{title}</span>
                  <span className={classNames('action')}>{action}</span>
                </div>
              </div>
            </div>
            {children && (
              <div className={classNames('content')} style={{ height: contentHeight || 'auto' }}>
                <div className={classNames('contentHeight', 'contentFixed')}>{children}</div>
              </div>
            )}
          </div>
        );
      };
    
      render() {
        const {
          loading = false,
          contentHeight,
          title,
          avatar,
          action,
          total,
          children,
          ...rest
        } = this.props;
        return (
          <Card loading={loading} bodyStyle={{ padding: '20px 24px 8px 24px' }} {...rest}>
            {this.renderConnet()}
          </Card>
        );
      }
}