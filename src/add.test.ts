import { describe, it, expect } from 'vitest'
import { add } from './add'

describe('add', () => {  
  it('works', () => {
    expect(add(1, 2)).toEqual(3)
  })
})
