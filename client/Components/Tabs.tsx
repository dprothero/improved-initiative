import * as React from "react";

interface TabsProps {
    options: string[];
    selected?: string;
    onChoose: (option: string) => void;
}

interface TabsState { }

export class Tabs extends React.Component<TabsProps, TabsState> {
    constructor(props) {
        super(props);
    }
    public render() {
        const spanElements = this.props.options.map(
            option => <span onClick={() => this.props.onChoose(option)}>{option}</span>
        );

        return <div className="c-tabs">
            {spanElements}
        </div>;
    }
}