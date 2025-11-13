import { render, fireEvent, act } from "@testing-library/react";
import Button from "../../src/components/SlotMachineGame/gameComponents/Button";
import InputNumber from "../../src/components/SlotMachineGame/gameComponents/InputNumber";
import Reel from "../../src/components/SlotMachineGame/gameComponents/Reel";
import { describe, it, expect, vi } from "vitest";


//TEST AF BUTTON COMPONENT
describe("Button", ()=>{
    it("renders children",()=>{
        const {getByText}=render(<Button>Spin</Button>);
        expect(getByText("Spin")).toBeTruthy();
    })

    it("handle clicks",()=>{
        const mockClick=vi.fn();
        const {getByText}=render(<Button onClick={mockClick}>Spin</Button>);
        fireEvent.click(getByText("Spin"));
        expect(mockClick).toHaveBeenCalledTimes(1);
    })

     it("is disabled when prop is true",()=>{
        const {getByText}=render(<Button disabled>Spin</Button>);
        expect(getByText("Spin").disabled).toBe(true);
     })
})

//TEST AF INPUTNUMBER COMPONENT
describe("InputNumber", ()=>{
    it("renders with intial value",()=>{
        const {getByDisplayValue}=render(<InputNumber value={50} onChange={()=>{}}></InputNumber>);
        expect(getByDisplayValue("50")).toBeTruthy();
    })
    
    it("Calls onChange with number value",()=>{
        const mockChange=vi.fn();
        const {getByRole }=render(<InputNumber value={0} onChange={mockChange}></InputNumber>);
        const input=getByRole("textbox");
        fireEvent.change(input,{target:{value:"100"}});
        expect(mockChange).toHaveBeenCalledWith(100);
    })

    it("sets 0 on empty input",()=>{
        const mockChange=vi.fn();
        const {getByRole}=render(<InputNumber value={10} onChange={mockChange}></InputNumber>);
        const input=getByRole("textbox");
        fireEvent.change(input,{target: {value:""}});
        expect(mockChange).toHaveBeenCalledWith(0);
    })
})


//TEST AF REEL COMMPONENT
describe("Reel", () => {
  it("renders 3 final symbols when not spinning", () => {
    const { container } = render(
      <Reel
        index={0}
        spinning={false}
        symbols={["🍒", "🍋", "🍀"]}
        finalSymbols={["🍒", "🍒", "🍒"]}
        onStop={() => {}}
      />
    );
    expect(container.querySelectorAll(".symbol").length).toBe(3); 
  });

  it("calls onStop after animation", async () => {
    vi.useFakeTimers(); 
    const mockStop = vi.fn();

    render(
      <Reel
        index={0}
        spinning={true}
        symbols={["🍒", "🍋"]}
        finalSymbols={["🍋", "🍋", "🍋"]}
        totalRandom={3} 
        onStop={mockStop}
      />
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockStop).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});


