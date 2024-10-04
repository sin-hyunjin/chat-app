## 데이터베이스 구조

### 1. Profile 모델

| 필드        | 타입     | 설명                          |
| ----------- | -------- | ----------------------------- |
| `id`        | String   | 고유 식별자 (UUID)            |
| `userId`    | String   | 사용자 ID (고유)              |
| `name`      | String   | 사용자 이름                   |
| `imageUrl`  | String   | 사용자 프로필 이미지 URL      |
| `email`     | String   | 사용자 이메일                 |
| `createdAt` | DateTime | 생성 날짜 (자동 생성)         |
| `updatedAt` | DateTime | 업데이트 날짜 (자동 업데이트) |

- **관계**
  - 서버(`Server`): 사용자가 소속된 서버 목록
  - 멤버(`Member`): 사용자가 소속된 멤버 목록
  - 채널(`Channel`): 사용자가 생성한 채널 목록

### 2. Server 모델

| 필드         | 타입     | 설명                          |
| ------------ | -------- | ----------------------------- |
| `id`         | String   | 고유 식별자 (UUID)            |
| `name`       | String   | 서버 이름                     |
| `imageUrl`   | String   | 서버 이미지 URL               |
| `inviteCode` | String   | 서버 초대 코드                |
| `profileId`  | String   | 서버의 소유자 프로필 ID       |
| `createdAt`  | DateTime | 생성 날짜 (자동 생성)         |
| `updatedAt`  | DateTime | 업데이트 날짜 (자동 업데이트) |

- **관계**
  - 프로필(`Profile`): 서버의 소유자 프로필
  - 멤버(`Member`): 서버에 소속된 멤버 목록
  - 채널(`Channel`): 서버에 속한 채널 목록

### 3. Member 모델

| 필드        | 타입       | 설명                                |
| ----------- | ---------- | ----------------------------------- |
| `id`        | String     | 고유 식별자 (UUID)                  |
| `role`      | MemberRole | 멤버 역할 (ADMIN, MODERATOR, GUEST) |
| `profileId` | String     | 소속 프로필 ID                      |
| `serverId`  | String     | 소속 서버 ID                        |
| `createdAt` | DateTime   | 생성 날짜 (자동 생성)               |
| `updatedAt` | DateTime   | 업데이트 날짜 (자동 업데이트)       |

- **관계**
  - 프로필(`Profile`): 멤버의 프로필
  - 서버(`Server`): 멤버가 소속된 서버

### 4. Channel 모델

| 필드        | 타입        | 설명                           |
| ----------- | ----------- | ------------------------------ |
| `id`        | String      | 고유 식별자 (UUID)             |
| `name`      | String      | 채널 이름                      |
| `type`      | ChannelType | 채널 유형 (TEXT, AUDIO, VIDEO) |
| `profileId` | String      | 채널 생성자 프로필 ID          |
| `serverId`  | String      | 채널이 속한 서버 ID            |
| `createdAt` | DateTime    | 생성 날짜 (자동 생성)          |
| `updatedAt` | DateTime    | 업데이트 날짜 (자동 업데이트)  |

- **관계**
  - 프로필(`Profile`): 채널 생성자의 프로필
  - 서버(`Server`): 채널이 속한 서버

## Enum 정의

### MemberRole

| 값          | 설명            |
| ----------- | --------------- |
| `ADMIN`     | 관리자 역할     |
| `MODERATOR` | 모더레이터 역할 |
| `GUEST`     | 손님 역할       |

### ChannelType

| 값      | 설명        |
| ------- | ----------- |
| `TEXT`  | 텍스트 채널 |
| `AUDIO` | 오디오 채널 |
| `VIDEO` | 비디오 채널 |
