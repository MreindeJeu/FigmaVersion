import { useParams, useNavigate, Link } from "react-router";
import { useData } from "../context/DataContext";
import { ArrowLeft, Cpu, Zap, Shield, Crosshair, Wrench, Heart, Flame, Box, Activity } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";
import { BackToTop } from "./BackToTop";
import { getFrameName, getWeaponName, getSystemName } from "../data/compconTypes";

export function MechDetailScreen() {
  const { pilotId, mechId } = useParams();
  const navigate = useNavigate();
  const { pilots } = useData();

  const pilot = pilots.find(p => p.id === pilotId);
  const mech = pilot?.mechs.find(m => m.id === mechId);

  if (!pilot || !mech) {
    return (
      <div className="min-h-screen p-8 font-mono flex items-center justify-center">
        <div className="border-2 border-red-500/30 bg-red-500/5 p-12 text-center max-w-2xl">
          <div className="text-red-500 text-6xl mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">
            ⚠ ERROR
          </div>
          <div className="text-2xl font-bold text-red-400 mb-4 tracking-wider">
            MECH DATA NOT FOUND
          </div>
          <div className="text-sm text-red-600/70 mb-6">
            // MECH ID "{mechId}" NOT FOUND IN PILOT REGISTRY
          </div>
          <button
            onClick={() => navigate("/pilots")}
            className="px-6 py-3 border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 hover:border-green-500 transition-all text-sm font-bold text-green-400 tracking-wider"
          >
            ← RETURN TO ROSTER
          </button>
        </div>
      </div>
    );
  }

  const loadout = mech.loadouts[mech.active_loadout_index] || mech.loadouts[0];

  return (
    <div className="min-h-screen p-8 font-mono">
      {/* Back Button */}
      <button
        onClick={() => navigate(`/pilots/${pilotId}`)}
        className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
        <span className="text-sm tracking-wider">RETURN TO PILOT FILE</span>
      </button>

      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: "PILOTS", path: "/pilots" },
        { label: pilot.callsign, path: `/pilots/${pilotId}` },
        { label: mech.name }
      ]} />

      {/* Terminal Header */}
      <div className="mb-8 border-2 border-cyan-500/50 bg-cyan-500/5 p-4">
        <div className="text-xs text-cyan-600/70 mb-2">// ACCESSING MECH CHASSIS DATA</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
            <h1 className="text-3xl font-bold text-cyan-400 tracking-wider drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
              ▶ MECH: {mech.name}
            </h1>
          </div>
          <div className="px-3 py-1 border-2 border-cyan-500/50 bg-cyan-500/10 text-xs font-bold tracking-wider text-cyan-300">
            {getFrameName(mech.frame)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Image and Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Mech Image */}
          <div className="border-2 border-cyan-500/30 bg-cyan-500/5 p-6">
            <div className="text-xs text-cyan-600/70 mb-3">// CHASSIS IMAGE</div>
            {mech.cloud_portrait ? (
              <div className="aspect-square border-2 border-cyan-500/30 overflow-hidden relative">
                <img 
                  src={mech.cloud_portrait} 
                  alt={mech.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 bg-cyan-500/5 flex items-center justify-center border-2 border-cyan-500/30 border-dashed">
                  <div className="text-center">
                    <Cpu className="w-16 h-16 mx-auto mb-3 text-cyan-600/30" />
                    <div className="text-xs text-cyan-600/70">NO IMAGE DATA</div>
                    <div className="text-[10px] text-cyan-700/50 mt-1">FILE NOT FOUND</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-square bg-cyan-500/5 flex items-center justify-center border-2 border-cyan-500/30 border-dashed">
                <div className="text-center">
                  <Cpu className="w-16 h-16 mx-auto mb-3 text-cyan-600/30" />
                  <div className="text-xs text-cyan-600/70">NO IMAGE DATA</div>
                  <div className="text-[10px] text-cyan-700/50 mt-1">FILE NOT FOUND</div>
                </div>
              </div>
            )}
          </div>

          {/* Basic Stats */}
          <div className="border-2 border-cyan-500/30 bg-cyan-500/5 p-6">
            <div className="text-xs text-cyan-600/70 mb-4">// CHASSIS STATUS</div>
            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-cyan-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-3 h-3 text-cyan-600/70" />
                  <div className="text-xs text-cyan-600/70">HIT POINTS</div>
                </div>
                <div className="text-cyan-300 font-bold text-2xl">{mech.current_hp}</div>
              </div>

              <div className="border-l-2 border-cyan-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-3 h-3 text-cyan-600/70" />
                  <div className="text-xs text-cyan-600/70">STRUCTURE</div>
                </div>
                <div className="text-cyan-300 font-bold text-2xl">{mech.current_structure}</div>
              </div>

              <div className="border-l-2 border-cyan-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-3 h-3 text-cyan-600/70" />
                  <div className="text-xs text-cyan-600/70">HEAT</div>
                </div>
                <div className="text-cyan-300 font-bold text-2xl">{mech.current_heat}</div>
              </div>

              <div className="border-l-2 border-cyan-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="w-3 h-3 text-cyan-600/70" />
                  <div className="text-xs text-cyan-600/70">STRESS</div>
                </div>
                <div className="text-cyan-300 font-bold text-2xl">{mech.current_stress}</div>
              </div>

              <div className="border-l-2 border-cyan-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className="w-3 h-3 text-cyan-600/70" />
                  <div className="text-xs text-cyan-600/70">REPAIRS</div>
                </div>
                <div className="text-cyan-300 font-bold text-xl">{mech.current_repairs}</div>
              </div>

              <div className="border-l-2 border-cyan-500/30 pl-3">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-3 h-3 text-cyan-600/70" />
                  <div className="text-xs text-cyan-600/70">CORE ENERGY</div>
                </div>
                <div className="text-cyan-300 font-bold text-xl">{mech.current_core_energy}</div>
              </div>
            </div>
          </div>

          {/* Pilot Info */}
          <div className="border-2 border-green-500/30 bg-green-500/5 p-6">
            <div className="text-xs text-green-600/70 mb-4">// ASSIGNED PILOT</div>
            <Link to={`/pilots/${pilotId}`} className="block hover:bg-green-500/10 transition-all p-3 -m-3">
              <div className="text-lg font-bold text-green-400 mb-1">{pilot.callsign}</div>
              <div className="text-sm text-green-600/70">{pilot.name}</div>
              <div className="text-xs text-green-700/70 mt-2">LICENSE LEVEL {pilot.level}</div>
            </Link>
          </div>
        </div>

        {/* Right Column - Loadout Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loadout Name */}
          <div className="border-2 border-cyan-500/30 bg-cyan-500/5 p-4">
            <div className="text-xs text-cyan-600/70 mb-2">// ACTIVE LOADOUT</div>
            <div className="text-2xl font-bold text-cyan-300">{loadout.name}</div>
          </div>

          {/* Weapons */}
          <div className="border-2 border-orange-500/30 bg-orange-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Crosshair className="w-5 h-5 text-orange-400" />
              <div className="text-sm font-bold text-orange-400 tracking-wider">// WEAPON SYSTEMS</div>
            </div>

            <div className="space-y-4">
              {/* Integrated Mounts */}
              {loadout.integratedMounts && loadout.integratedMounts.length > 0 && loadout.integratedMounts.map((mount, idx) => (
                mount.weapon && (
                  <div key={`integrated-${idx}`} className="border-2 border-orange-500/30 bg-orange-500/5 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-orange-600/70 font-bold">INTEGRATED MOUNT</div>
                      {mount.weapon.destroyed && (
                        <div className="text-xs px-2 py-1 border border-red-500/50 bg-red-500/10 text-red-400">DESTROYED</div>
                      )}
                    </div>
                    <div className="text-orange-300 font-bold">{getWeaponName(mount.weapon.id)}</div>
                  </div>
                )
              ))}

              {/* Regular Mounts */}
              {loadout.mounts.map((mount, idx) => (
                <div key={`mount-${idx}`} className="border-2 border-orange-500/30 bg-orange-500/5 p-4">
                  <div className="text-xs text-orange-600/70 mb-2 font-bold">{mount.mount_type.toUpperCase()} MOUNT</div>
                  
                  {mount.slots.map((slot, slotIdx) => (
                    slot.weapon && (
                      <div key={`slot-${slotIdx}`} className="mb-3 last:mb-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-orange-300 font-bold">{getWeaponName(slot.weapon.id)}</div>
                          {slot.weapon.destroyed && (
                            <div className="text-xs px-2 py-1 border border-red-500/50 bg-red-500/10 text-red-400">DESTROYED</div>
                          )}
                        </div>
                        <div className="text-xs text-orange-600/70">{slot.size} SLOT</div>
                      </div>
                    )
                  ))}

                  {mount.extra && mount.extra.map((slot, slotIdx) => (
                    slot.weapon && (
                      <div key={`extra-${slotIdx}`} className="mb-3 last:mb-0 mt-3 pt-3 border-t border-orange-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-orange-300 font-bold">{getWeaponName(slot.weapon.id)}</div>
                          {slot.weapon.destroyed && (
                            <div className="text-xs px-2 py-1 border border-red-500/50 bg-red-500/10 text-red-400">DESTROYED</div>
                          )}
                        </div>
                        <div className="text-xs text-orange-600/70">{slot.size} SLOT (EXTRA)</div>
                      </div>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Systems */}
          <div className="border-2 border-purple-500/30 bg-purple-500/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Box className="w-5 h-5 text-purple-400" />
              <div className="text-sm font-bold text-purple-400 tracking-wider">// SYSTEM MODULES</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {loadout.systems.map((system, idx) => (
                <div key={`system-${idx}`} className="border-2 border-purple-500/30 bg-purple-500/5 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-purple-300 font-bold text-sm">{getSystemName(system.id)}</div>
                    {system.destroyed && (
                      <div className="text-xs px-2 py-1 border border-red-500/50 bg-red-500/10 text-red-400">DESTROYED</div>
                    )}
                  </div>
                  {system.uses > 0 && (
                    <div className="text-xs text-purple-600/70">USES: {system.uses}</div>
                  )}
                  {system.flavorDescription && (
                    <div className="text-xs text-purple-600/50 mt-2 line-clamp-2">{system.flavorDescription}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {mech.notes && (
            <div className="border-2 border-cyan-500/30 bg-cyan-500/5 p-6">
              <div className="text-xs text-cyan-600/70 mb-4">// MECH NOTES</div>
              <div className="text-sm text-cyan-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: mech.notes }} />
            </div>
          )}
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
