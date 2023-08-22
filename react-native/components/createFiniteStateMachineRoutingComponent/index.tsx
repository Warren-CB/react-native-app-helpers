import * as React from 'react'
import type { FunctionComponent } from 'react'
import type { RouteParameters } from '../../types/RouteParameters'
import type { RouteTable } from '../../types/RouteTable'
import type { FiniteStateMachineRoutingProps } from '../../types/FiniteStateMachineRoutingProps'

/**
 * Creates a React component which renders a single route from state.
 * @template TRouteParameters The parameters of the routes mapped.
 * @template TOtherProps      Any other props the routes accept.
 * @param routeTable          The route table the component will render from.
 * @returns                   A React component which renders a route from the
 *                            given table.
 */
export const createFiniteStateMachineRoutingComponent = <
  TRouteParameters extends RouteParameters,
  TOtherProps extends Readonly<Record<string, unknown>>
>(
    routeTable: RouteTable<TRouteParameters, TOtherProps>
  ): FunctionComponent<FiniteStateMachineRoutingProps<TRouteParameters, TOtherProps>> => {
  return (props) =>
    React.createElement(routeTable[props.routeState.key], props)
}
