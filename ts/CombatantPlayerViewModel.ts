module ImprovedInitiative {
  export class CombatantPlayerViewModel {
    Name: string;
    HPDisplay: string;
    HPColor: string;
    Initiative: number;
    IsPlayerCharacter: boolean;

    constructor(creature: ICreature){
      this.Name = creature.ViewModel ? creature.ViewModel.DisplayName() : 
                                       creature.StatBlock().Name;
      this.HPDisplay = this.GetHPDisplay(creature);
      this.HPColor = "black";//this.GetHPColor(creature.ViewModel)
      this.Initiative = creature.Initiative();
      this.IsPlayerCharacter = creature.IsPlayerCharacter;
    }
    
    private GetHPDisplay(creature: ICreature): string {
      if(creature.IsPlayerCharacter){
        if(creature.TemporaryHP()){
          return '{0}+{1}/{2}'.format(creature.CurrentHP(), creature.TemporaryHP(), creature.MaxHP);
        } else {
          return '{0}/{1}'.format(creature.CurrentHP(), creature.MaxHP);
        }
      }
      if(creature.Encounter.Rules.EnemyHPTransparency == "whenBloodied"){
        if(creature.CurrentHP() <= 0){
          return "<span class='defeatedHP'>Defeated</span>";
        } else if (creature.CurrentHP() < creature.MaxHP / 2){
          return "<span class='bloodiedHP'>Bloodied</span>";
        } else if (creature.CurrentHP() < creature.MaxHP){
          return "<span class='hurtHP'>Hurt</span>";
        }
        return "<span class='healthyHP'>Healthy</span>";
      } else {
        if(creature.CurrentHP() <= 0){
            return "<span class='defeatedHP'>Defeated</span>";
          }
        return "<span class='healthyHP'>Healthy</span>";
      }
    }
  }
  
}