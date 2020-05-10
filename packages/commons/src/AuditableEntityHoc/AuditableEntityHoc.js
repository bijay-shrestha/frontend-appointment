import React from 'react'
import {CHybridInput} from '@frontend-appointment/ui-elements'
import {ColWrapperComponent} from './ColWrapperComponent'
import {Col, Row} from 'react-bootstrap'
const AuditableEntityHoc = (auditableEntityObj, isNotAddCol, colSize) => {
  const {
    createdBy,
    createdDate,
    lastModifiedBy,
    lastModifiedDate,
    modifiedBy,
    modifiedDate
  } = auditableEntityObj
  const CreatedByComponent = (
    <CHybridInput placeholder="Created By" value={createdBy} disabled={true} />
  )

  const CreatedDateComponent = (
    <CHybridInput
      placeholder="Created Date"
      value={createdDate}
      disabled={true}
    />
  )

  const ModifiedByComponent = (
    <CHybridInput
      placeholder="Last Modified By"
      value={lastModifiedBy || modifiedBy}
      disabled={true}
    />
  )
  const ModifiedDateComponent = (
    <CHybridInput
      placeholder="Last Modified Date"
      value={lastModifiedDate || modifiedDate}
      disabled={true}
    />
  )

  return (
    <>
      {createBy ||
      createdDate ||
      lastModifiedBy ||
      lastModifiedDate ||
      modifiedBy ||
      modifiedDate ? (
        <Col xs={12} className="mb-2">
          <h5>Audit Details</h5>
        </Col>
      ) : null}
      {createdBy ? (
        isNotAddCol ? (
          CreatedByComponent
        ) : (
          <ColWrapperComponent
            colSize={colSize}
            Component={CreatedByComponent}
          />
        )
      ) : (
        ''
      )}
      {createdDate ? (
        isNotAddCol ? (
          CreatedDateComponent
        ) : (
          <ColWrapperComponent
            colSize={colSize}
            Component={CreatedDateComponent}
          />
        )
      ) : (
        ''
      )}
      {lastModifiedBy || modifiedBy ? (
        isNotAddCol ? (
          ModifiedByComponent
        ) : (
          <ColWrapperComponent
            colSize={colSize}
            Component={ModifiedByComponent}
          />
        )
      ) : (
        ''
      )}
      {lastModifiedDate || modifiedDate ? (
        isNotAddCol ? (
          ModifiedDateComponent
        ) : (
          <ColWrapperComponent
            colSize={colSize}
            Component={ModifiedDateComponent}
          />
        )
      ) : null}
      :null }
    </>
  )
}

export default AuditableEntityHoc
