import { SystemStatusProviderInterface } from '@/providers/system-status.provider'
import { MemorySystemStatusProvider } from '../../../__tests__/providers/memory-system-status.provider'
import { GetSystemStatusUsecase } from '../get-system-status.usecase'

interface GetSystemStatusUsecaseProps {
  statusProvider?: SystemStatusProviderInterface
}

export function makeGetSystemStatusUsecase(
  props: GetSystemStatusUsecaseProps = {},
): GetSystemStatusUsecase {
  const statusProvider =
    props.statusProvider ?? new MemorySystemStatusProvider()

  const usecase = new GetSystemStatusUsecase(statusProvider)

  ;(usecase as any).systemStatusProvider = statusProvider

  return usecase
}
