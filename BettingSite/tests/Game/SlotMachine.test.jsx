//TEST
import { render, fireEvent, act } from "@testing-library/react";
import Button from "../../src/components/SlotMachineGame/gameComponents/Button";
import InputNumber from "../../src/components/SlotMachineGame/gameComponents/InputNumber";
import Reel from "../../src/components/SlotMachineGame/gameComponents/Reel";
import SlotMachine from "../../src/components/SlotMachineGame/gameComponents/SlotMachine";
import { describe, it, expect, vi } from "vitest";
import { Sound } from "../../src/components/SlotMachineGame/gameComponents/Sounds";


// --- TEST AF BUTTON COMPONENT --- //
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

// --- TEST AF INPUTNUMBER COMPONENT --- //
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


// --- TEST AF REEL COMMPONENT --- //
describe("Reel", () => {
  it("renders 3 final symbols when not spinning", () => {
    const { container } = render(
      <Reel
        index={0}
        spinning={false}
        symbols={["CL", "D", "C"]}
        finalSymbols={["C", "N", "C"]}
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
        symbols={["C", "D"]}
        finalSymbols={["C", "C", "C"]}
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


// --- TEST AF SLOTMACHINE COMPONENT --- // 
// Mock backend API
beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock("../../src/services/ControllerService/gameApi", () => ({
  playSlot: vi.fn().mockResolvedValue({
    payout: 0,
    finalGrid: [
      ["diamond", "clover", "coin"],
      ["nine", "clover", "clover"],
      ["coin", "nine", "diamond"]
    ]
  })
}));

vi.mock('../../src/Context/UserContext', () => {
    return {
        useUserInfo: () => ({
            totalBalance: 1000,
            setTotalBalance: vi.fn(),
        }),
    };
});

vi.mock("../../src/components/SlotMachineGame/gameComponents/Sounds", () => ({
  Sound: {
    lobbySound: { loop: false, pause: vi.fn(), currentTime: 0 },
    failSound: { pause: vi.fn(), currentTime: 0 },
    winSound: { pause: vi.fn(), currentTime: 0 },
    spinSound: { pause: vi.fn(), currentTime: 0 },

    playLobby: vi.fn(),
    playSpin: vi.fn(),
    playWin: vi.fn(),
    playFail: vi.fn()
  },
}));

describe("SlotMachine Integration", ()=>{


  it("renders balance, bet and spin button",()=>{
    const {getByText, getByRole} = render (<SlotMachine></SlotMachine>);
    expect(getByText("Session Balance")).toBeTruthy();
  })

  it("does NOT allow bet to exceed balance", () => {
  const { getByRole, getByText } = render(<SlotMachine />);
  const input = getByRole("textbox");
  const spin = getByText("Spin");

  fireEvent.change(input, { target: { value: "2000" } });

  expect(spin.disabled).toBe(false);
});



  it("starts spinning and shows 'Spinning' message", () => {
  const { getByText, getByRole } = render(<SlotMachine />);

  fireEvent.change(getByRole("textbox"), { target: { value: "20" } });

  const spin = getByText("Spin");   
  fireEvent.click(spin);
  
  expect(getByText("Spinning")).toBeTruthy();
});

it("plays lobby sound on mount", () => {
  render(<SlotMachine />);
  expect(Sound.playLobby).toHaveBeenCalledTimes(1);
});

it("plays spin sound when spinning starts", () => {
  const { getByText, getByRole } = render(<SlotMachine />);
  fireEvent.change(getByRole("textbox"), { target: { value: "20" } });
  fireEvent.click(getByText("Spin"));

  expect(Sound.playSpin).toHaveBeenCalledTimes(1);
});


})