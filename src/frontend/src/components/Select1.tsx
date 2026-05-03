import { Select } from 'tamagui' // or '@tamagui/select'

export default function Select1() {
  return (
    <Select defaultValue="">
      <Select.Trigger>
        <Select.Value placeholder="Search..." />
      </Select.Trigger>
      {/* Optional: Control focus behavior */}
    <Select.FocusScope loop trapped focusOnIdle={true}>
      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Group>
            <Select.Label />
            
              <Select.Item value="latte" index={0}>
                    <Select.ItemText>Latte</Select.ItemText>
                </Select.Item>
            
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select.FocusScope>
  </Select>
)}