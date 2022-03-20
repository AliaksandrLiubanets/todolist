import {LinearProgress} from '@material-ui/core'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {RequestStatusType} from '../../app/app-reducer'
import React from 'react'
import s from './Linear.module.css'

export const Linear = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return <div className={s.linear}>
        {status === 'loading' ? <LinearProgress /> : null }
    </div>
}