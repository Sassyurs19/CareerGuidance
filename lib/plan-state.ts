import { canFinishAt, nodes, type Plan } from './catalog';

export function pathComplete(plan:Plan):boolean {
 const last=plan.path.at(-1);
 return plan.path.length>1&&!!last&&Object.prototype.hasOwnProperty.call(nodes,last)&&canFinishAt(last);
}

export function isPlanLocked(plan:Plan):boolean {
 return (typeof plan.lockedAt==='number'&&Number.isFinite(plan.lockedAt)&&plan.lockedAt>0)||(plan.version===undefined&&pathComplete(plan)&&nodes[plan.path.at(-1)!].next.length===0);
}

// The previous site saved completed routes without a lock field. Preserve those choices.
export function normalizeStoredPlan(plan:Plan,updated?:number):Plan {
 const locked=isPlanLocked(plan);
 const lockedAt=locked?(plan.lockedAt||(typeof updated==='number'&&Number.isFinite(updated)&&updated>0?updated:Date.now())):undefined;
 return {...plan,version:2,...(locked?{lockedAt,overviewSeen:plan.overviewSeen===true}:{lockedAt:undefined,overviewSeen:undefined})};
}
