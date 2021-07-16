import React,{FC,ReactElement, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bugAdded, bugResolved, BugsModel, getUnresolvedBugs, loadBugs } from './store/bugs';
import { AppDispatch, RootState } from './store/configureStore';
import { useAppSelector } from './store/hooks';

const BugsList: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const bugs = useAppSelector((state: RootState)  => state.entities.bugs.list);
    const unresolvedBugs = useAppSelector(getUnresolvedBugs);
    useEffect(()=>{
        dispatch(loadBugs());
        dispatch(bugAdded({description: "bugOne1"}));
        dispatch(bugAdded({description: "bugOne2"}));
        dispatch(bugAdded({description: "bugOne3"}));
        dispatch(bugAdded({description: "bugOne4"}));
        dispatch(bugAdded({description: "bugOne5"}));

        dispatch(bugResolved({id: 1}));
        dispatch(bugResolved({id: 2}));
        dispatch(bugResolved({id: 3}));
    },[])

    return (
        <ul>
            {
                bugs.map((bug)=>{
                    return <li key={bug.id} >{bug.description}</li>
                })
            }
            <h1>Unresovled bugs</h1>
            {
                unresolvedBugs.map((bug)=>{
                    return <li key={bug.id} >{bug.description}</li>
                })
            }
        </ul>
    );
}


export default BugsList;