import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { useState } from 'react';
import Budget from '../pages/Budget';

const COLORS = ['var(--primary)', 'rgba(0, 0, 0, 0)'];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <TooltipContainer>
                <TooltipLabel>{`${label}:`}</TooltipLabel>
                <TooltipValue>{`${payload[0].value.toFixed(2)}$`}</TooltipValue>
            </TooltipContainer>
        );
    }

    return null;
};

const CustomLabel = ({ viewBox, spentPercentage }) => {
    const { cx, cy } = viewBox;
    return (
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={props => props.theme.primary} fontSize="1.5rem" fontWeight="bold">
            {spentPercentage}%
        </text>
    );
};

const Title = styled.h2`
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 20px;
`;

const TooltipContainer = styled.div`
  background-color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const TooltipLabel = styled.p`
  font-size: 0.8rem;
  font-weight: bold;
  margin: 0;
`;

const TooltipValue = styled.p`
  font-size: 0.8rem;
  margin: 0;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  font-size: 0.7rem; // Add this line to change the text size
  font-weight: bold; // Add this line to make the text bold

  &::before {
    content: '';
    display: block;
    width: 16px; // Change the width to make the icon bigger
    height: 16px; // Change the height to make the icon bigger
    background-color: ${props => props.color};
    border-radius: 4px;
    margin-right: 0.25rem;
  }
`;

const Button = styled.a`
  font-size: 0.8rem; // Change the font size
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

`;

const Modal = ({ isOpen, closeModal }) => {
    if (!isOpen) return null;

    return (
        <dialog id="modal-example" open>
            <article>
                <a
                    href="#close"
                    aria-label="Close"
                    className="close"
                    data-target="modal-example"
                    onClick={closeModal}
                ></a>
                <h3>Set budget</h3>
                <Budget />
                <footer>
                    <a
                        href="#cancel"
                        role="button"
                        className="secondary"
                        data-target="modal-example"
                        onClick={closeModal}
                    >
                        Cancel
                    </a>
                    <a
                        href="#confirm"
                        role="button"
                        data-target="modal-example"
                        onClick={closeModal}
                    >
                        Confirm
                    </a>
                </footer>
            </article>
        </dialog>
    );
};

const BudgetDonut = ({ data }) => {
    const spentPercentage = Math.round((data[0].value / (data[0].value + data[1].value)) * 100);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <Title>Weekly Budget</Title>
            <ResponsiveContainer width="100%" height="70%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={52}
                        outerRadius={75}
                        fill="#8884d8"
                        paddingAngle={0}
                        dataKey="value"
                        startAngle={90} // Add this line
                        endAngle={450} // Add this line
                        cornerIsRound // Add this line
                        cornerRadius={15} // Add this line
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}
                                stroke={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <foreignObject x="40%" y="40%" width="20%" height="20%">
                        <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            style={{
                                textAlign: 'center',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                            }}
                        >
                            {spentPercentage}%
                        </div>
                    </foreignObject>
                    <Tooltip content={<CustomTooltip />} />

                </PieChart>

            </ResponsiveContainer>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex' }}>
                    <LegendItem key={`legend-0`} color={COLORS[0]}>
                        {data[0].name}
                    </LegendItem>
                </div>
                <Modal isOpen={isModalOpen} closeModal={toggleModal} />
                <Button href="#" role="button" class="contrast" onClick={toggleModal}>OPTIONS</Button>
            </div>
        </>
    );
};
export { CustomTooltip };
export default BudgetDonut;
