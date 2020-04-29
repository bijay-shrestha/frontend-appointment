import React, {PureComponent} from 'react'
import {CHybridInput} from '@frontend-appointment/ui-elements'
import {Col} from 'react-bootstrap'
const AuditableEntityHoc = auditableEntityObj => {
  const {
    createdBy,
    createdDate,
    lastModifiedBy,
    lastModifiedDate
  } = auditableEntityObj
  return (
    <>
      {createdBy && (
        <Col sm={12} md={12} lg={6}>
          <CHybridInput
            placeholder="Created By"
            value={createdBy}
            disabled={true}
          />
        </Col>
      )}{' '}
      {createdDate && (
        <Col sm={12} md={12} lg={6}>
          <CHybridInput
            placeholder="Created Date"
            value={createdDate}
            disabled={true}
          />
        </Col>
      )}{' '}
      {lastModifiedBy && (
        <Col sm={12} md={12} lg={6}>
          <CHybridInput
            placeholder="Last Modified By"
            value={lastModifiedBy}
            disabled={true}
          />
        </Col>
      )}{' '}
      {lastModifiedDate && (
        <Col sm={12} md={12} lg={6}>
          <CHybridInput
            placeholder="Last Modified Date"
            value={lastModifiedDate}
            disabled={true}
          />
        </Col>
      )}
    </>
  )
}

export default AuditableEntityHoc
